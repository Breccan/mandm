task :import_meshblock_data => :environment do 
  require 'csv'
  n = 0
  @parsed_file=CSV.foreach(Rails.root + 'data/nzdep2006.csv', :col_sep => ' ') do |row|
    n += 1
    next if n == 1
    c = Meshblock.new
    c.meshblock = row[0]
    c.cau = row[1]
    c.deprivation = row[2]
    c.deprivation_score = row[3]
    c.population = row[4]
    if c.save
      GC.start if n % 50 == 0
    end
    puts "#{n} lines parsed}"
  end

  
end
