# Create a CloudFront public key resource.
resource "aws_cloudfront_public_key" "abda_lab_public_key" {
  name        = "ABDA-Lab-Key-Group-PublicKey"
  encoded_key = var.abda_lab_public_key_group
  comment = "Public key for ABDA Lab key group"
  lifecycle {
    ignore_changes = [ encoded_key ]
  }
}

# Create the CloudFront key group using the public key above.
resource "aws_cloudfront_key_group" "abda_lab_key_group" {
  name    = "Custom-ABDA-Lab-Key-Group"
  items   = [aws_cloudfront_public_key.abda_lab_public_key.id]
  comment = "Key group for ABDA"

}
