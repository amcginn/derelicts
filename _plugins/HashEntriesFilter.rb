require_all "jekyll/filters"

module Jekyll
  module HashEntriesFilter
    def entries(input)
      if input
        if input.class === 'Hash'
          entries = []
          input.each do |key, value|
            entries.push({ key => value })
          end

          return entries
        elsif input.class === 'Array'
          return input;
        end
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::HashEntriesFilter)