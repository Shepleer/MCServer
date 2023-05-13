# MCServer

### Generate SSH Signatures in PEM Format for JWT

1. Go to ./secrets folder
2. Run `ssh-keygen -t rsa -b 4096 -m PEM -f access.key` for access token and `ssh-keygen -t rsa -b 4096 -m PEM -f refresh.key` for refresh token
3. Make PEM version for public keys: `ssh-keygen -f access.key.pub -e -m pem`, `ssh-keygen -f refresh.key.pub -e -m pem`