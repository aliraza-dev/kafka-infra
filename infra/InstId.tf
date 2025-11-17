data "aws_ami" "web_01" {
  most_recent = true
  
  filter {
    name = "name"
    values= ["ami_id_name"]
  }

  filter {
    name = "virtualization-type"
    values = ["hvm"]
  }

  owners = [ "12345" ]
   
}

output "instance_id" {
  description = "AMI ID of ubuntu instance"
  value = data.aws_ami.web_01.id
}

# A few useful commands
# terraform init
# terraform validate
# terraform plan - It will return instance Id 
# terraform apply
# terraform history