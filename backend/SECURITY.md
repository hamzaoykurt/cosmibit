# Güvenli Yapılandırma Kılavuzu

## ⚠️ UYARI: Hassas Bilgileri Asla Kodda Saklamayın!

Bu proje environment variable'lar kullanarak hassas bilgileri güvenli bir şekilde yönetir.

## Geliştirme Ortamı İçin Kurulum

### 1. Environment Variable Dosyası Oluşturun

Backend dizininde `.env` dosyası oluşturun (`.env.example`'dan kopyalayın):

```bash
cd backend
cp .env.example .env
```

### 2. Gerçek Değerlerinizi Ekleyin

`.env` dosyasını düzenleyin ve gerçek MongoDB bağlantı dizinizi ekleyin:

```properties
SPRING_DATA_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
COSMIBIT_FRONTEND_URL=http://localhost:3000
```

**ÖNEMLİ:** `.env` dosyası `.gitignore` içinde olduğu için Git'e commit edilmeyecektir.

## Uygulamayı Çalıştırma

### Seçenek 1: IDE'den Çalıştırma (IntelliJ IDEA / Eclipse)

1. Run Configuration'ı açın
2. Environment Variables bölümüne gidin
3. Environment variable'larınızı ekleyin:
   ```
   SPRING_DATA_MONGODB_URI=your_connection_string
   COSMIBIT_FRONTEND_URL=http://localhost:3000
   ```

### Seçenek 2: Terminal'den Çalıştırma

#### Linux/Mac:
```bash
export SPRING_DATA_MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/dbname"
export COSMIBIT_FRONTEND_URL="http://localhost:3000"
mvn spring-boot:run
```

#### Windows (PowerShell):
```powershell
$env:SPRING_DATA_MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/dbname"
$env:COSMIBIT_FRONTEND_URL="http://localhost:3000"
mvn spring-boot:run
```

#### Windows (CMD):
```cmd
set SPRING_DATA_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
set COSMIBIT_FRONTEND_URL=http://localhost:3000
mvn spring-boot:run
```

### Seçenek 3: Spring Profiles Kullanma

`application-local.properties` dosyası oluşturun (bu dosya .gitignore'da):

```properties
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/dbname
cosmibit.frontend.url=http://localhost:3000
```

Ardından uygulamayı şu şekilde çalıştırın:
```bash
mvn spring-boot:run -Dspring.profiles.active=local
```

## Production Ortamı İçin

### Docker Kullanıyorsanız:

```dockerfile
docker run -e SPRING_DATA_MONGODB_URI="..." -e COSMIBIT_FRONTEND_URL="..." cosmibit-backend
```

### Kubernetes:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cosmibit-secrets
type: Opaque
data:
  mongodb-uri: <base64-encoded-connection-string>
```

### Cloud Platform'lar:

- **Heroku:** Config Vars bölümünden
- **AWS:** AWS Secrets Manager veya Parameter Store
- **Azure:** Azure Key Vault
- **Google Cloud:** Secret Manager

## MongoDB Şifresini Değiştirme

**Eğer şifreniz yanlışlıkla commit edildiyse:**

1. **Hemen MongoDB şifresini değiştirin:**
   - MongoDB Atlas'a giriş yapın
   - Database Access → Users
   - İlgili kullanıcının şifresini değiştirin

2. **Yeni şifreyi environment variable olarak güncelleyin**

3. **Git geçmişini temizleyin** (aşağıya bakın)

## Git Geçmişinden Hassas Bilgileri Temizleme

### BFG Repo-Cleaner Kullanarak:

```bash
# BFG'yi indirin
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# Hassas bilgiyi içeren dosyayı temizleyin
java -jar bfg-1.14.0.jar --delete-files application.properties

# Değişiklikleri uygulayın
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (DİKKATLİ!)
git push origin --force --all
```

### git-filter-repo Kullanarak:

```bash
# git-filter-repo'yu yükleyin
pip install git-filter-repo

# Hassas bilgiyi içeren dosyayı geçmişten kaldırın
git filter-repo --path backend/src/main/resources/application.properties --invert-paths

# Force push
git push origin --force --all
```

## Güvenlik Kontrol Listesi

- [ ] `.env` dosyası `.gitignore`'da mı?
- [ ] `application.properties` sadece `${ENV_VAR}` placeholder'ları içeriyor mu?
- [ ] Hassas bilgi içeren dosyalar commit edilmemiş mi?
- [ ] Production ortamında environment variable'lar doğru ayarlanmış mı?
- [ ] MongoDB kullanıcısının minimum yetkilerle sınırlandırıldı mı?
- [ ] MongoDB IP whitelist doğru yapılandırılmış mı?

## Daha Fazla Bilgi

- [Spring Boot Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config)
- [MongoDB Atlas Security Best Practices](https://www.mongodb.com/docs/atlas/security/)
