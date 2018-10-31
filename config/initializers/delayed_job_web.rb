# DelayedJobWeb.use Rack::Auth::Basic do |username, password|
#   # authenticate
#   puts username
#   puts "=============== in it! ================== "
#   user = User.find_by_username(username)
#   puts "=============== found user! ================== "
#   return false unless user.authenticate(password)
#
#   puts "=============== will i see this ================== "
#   return false unless user.admin?
#   true
# end

# DelayedJobWeb.use authenticate_or_request_with_http_digest do |user_name, password|
#   user_name == "foo" && password == "bar"
#   warden.custom_failure! if performed?
# end
