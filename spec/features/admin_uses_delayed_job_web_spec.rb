require "rails_helper"

RSpec.describe "Admin use DelayedJobWeb", type: :request do
  let(:user) { create(:user) }

  before do
    # user.add_role(:super_admin)
    # sign_in user
  end

  describe "GET /delayed_job" do
    it "require user to be signed in" do
      get "/delayed_job/overview"
      expect(response).to have_http_status(401)
    end

    it "returns 200 for super admins" do
      user.add_role(:super_admin)
      sign_in user
      get "/delayed_job/overview"
      expect(response).to have_http_status(200)
    end
  end
end
