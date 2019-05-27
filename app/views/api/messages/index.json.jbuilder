json.array! @messages do |message|
  json.id message.id
  json.content message.content
  json.image message.image
  json.created_at message.created_at.to_s(:default)
  json.user_name message.user.name
end