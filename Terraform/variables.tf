variable "origin_domain_name" {
  description = "The origin's domain name (Wasabi endpoint)"
  type        = string
  default     = "s3.ap-southeast-1.wasabisys.com"
}

variable "origin_path" {
  description = "The origin path to append to the domain name"
  type        = string
  default     = "/khangstorage"
}

variable "abda_lab_public_key_group" {
  description = "CloudFront public key group (PEM formatted)"
  type        = string
  default = <<EOF
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8whnG16lrARXq9aeu20M
Jm7kr3TUFKL7Fl1Xbrajef7rP/Q1mpp+T+mZWjtI8AiCrJp5Vwwn0gDlxeAhD6MP
b1+iZSr+NDD/UueB89Hpiinr7azIoQWLumJPeDlLrEI1tSRMxYXGle5Ws+4sOVY/
qMSYvPllD2KBh6MSXvWAU7Rq7BKlYhUc9lplDmGZth4HfNtDztqbA7MCn5Q/Lecm
Z4Zl6zi2TcFjTeUIHOgTF+4CfrZVjM1IwQDmNNsPnD1E4ZP/tcsVJKpAPCkg2Nvy
loWerbXAg85m4UFyxVSqX3CC0fZdMbixzTuHUby/lunuzp1NymO8LqNPi5XDY4Vz
iwIDAQAB
-----END PUBLIC KEY-----
EOF
}

variable "lambda_edge_secret" {
  description = "Secret used to sign the cookie generated by CloudFront"
  type        = string
  default = "0Kg04La06!"
}

variable "terraform_user" {
  description = "AWS profile name to use"
  type        = string
  default     = "terraform-user"
}