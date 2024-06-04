require_all "jekyll/filters"

module Jekyll
  module HashValuesFilter
    def hash_values(input)
      return 'jjj'
      # puts('testingish')
      # if input
      #   if input.class === 'Hash'
      #
      #     return input.each_key
      #   elsif input.class === 'Array'
      #     return input;
      #   else
      #     return nil
      #   end
      # end
    end
  end
end

Liquid::Template.register_filter(Jekyll::HashValuesFilter)
