require "rails_helper"

RSpec.describe LanguageDetector do
  let(:stubbed_algorithmia) { double }

  describe "::detect" do
    before do
      allow(Algorithmia).to receive(:client).and_return(stubbed_algorithmia)
      allow(stubbed_algorithmia).to receive(:algo).and_return(stubbed_algorithmia)
      allow(stubbed_algorithmia).to receive(:pipe).and_return(stubbed_algorithmia)
      allow(stubbed_algorithmia).to receive(:result)
    end

    it "returns language" do
      text = "random english language"
      described_class.detect(text)
      expect(stubbed_algorithmia).to have_received(:pipe).with(text).once
    end
  end
end
