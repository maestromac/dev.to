module LanguageDetector
  ALGORITHM = "miguelher/LanguageDetector/0.1.0".freeze

  def self.detect(text)
    client = Algorithmia.client(ApplicationConfig["ALGORITHMIA_KEY"])
    client.algo(ALGORITHM).pipe(text).result
  rescue Algorithmia::Errors::AlgorithmError => e
    logger.error "Algorithm Error: #{e.message}"
  end
end
