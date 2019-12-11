class Users::Settings::ProfileController < ApplicationController
  before_action :set_no_cache_header
  # before_action :raise_banned, only: %i[update]
  # before_action :set_user, only: %i[update update_twitch_username update_language_settings confirm_destroy request_destroy full_delete remove_association]
  # after_action :verify_authorized, except: %i[signout_confirm add_org_admin remove_org_admin remove_from_org]

  def edit
    @tab = "profile"
    @tab_list = %w[
      Profile
      Integrations
      Notifications
      Publishing\ from\ RSS
      Organization
      Billing
      Account
      Misc
    ]
    unless current_user
      skip_authorization
      return redirect_to sign_up_path
    end
    set_user
    # set_tabs(params["tab"] || "profile")
    # handle_settings_tab
  end

  def update; end

  private

  def set_user
    @user = current_user
    authorize @user
  end
end
