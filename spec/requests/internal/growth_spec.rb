require "rails_helper"

RSpec.describe "/internal/growth", type: :request do
  let(:user)    { create(:user) }

  describe "GET /internal/growth" do
    before do
      sign_in user
    end

    it "updates reaction to be confirmed" do
      get "/internal/growth"
      expect(response).to have_http_status(:ok)
    end
  end
end
