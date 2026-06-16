output "public_ip" {
  value = aws_instance.todo_server.public_ip
  sensitive = true
}

output "instance_id" {
  value = aws_instance.todo_server.id
}