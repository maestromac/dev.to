module Surveiled
  extend ActiveSupport::Concern

  included do
    after_create :warned_user_ping, if: user.warned
  end

  private

  def warned_user_ping
    message = <<~HEREDOC
      @#{user.username} just posted.
      They've been warned since #{formatted_time}
      https://dev.to#{path}
    HEREDOC

    SlackBot.delay.ping message,
      channel: "warned-user-activity",
      username: "sloan_watch_bot",
      icon_emoji: ":sloan:"
  end

  def formatted_time
    user.roles.where(name: "warned")[0].updated_at.strftime("%d %B %Y")
  end
end
