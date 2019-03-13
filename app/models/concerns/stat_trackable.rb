module StatTrackable
  extend ActiveSupport::Concern

  module ClassMethods
    def statistics(arg)
      stats = pro_dashboard_stats(arg)

      timeframe = Proc.new do |a, b|
        stats.where("created_at > ? AND created_at < ?", a, b || Time.now).size
      end

      {
        this_week: timeframe.call(2.weeks.ago, 1.week.ago),
        last_week: timeframe.call(1.weeks.ago),
        last_month: timeframe.call(2.months.ago, 1.months.ago),
        this_month: timeframe.call(1.months.ago)
      }
    end
  end
end
