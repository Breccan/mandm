task :import_meshblock_data => :environment do 
  require 'csv'

  @parsed_file=CSV::Reader.parse(Rails.root + 'data/nzdep2006.csv')

  n = 0
  @parsed_file.each do |row|
    c = Meshblock.new
    c.meshblock = row[0]
    c.cau = row[1]
    c.deprivation = row[2]
    c.deprivation_score = row[3]
    c.population = row[4]
    if c.save
      n = n + 1
      GC.start if n % 50 == 0
    end
    puts "CSV Import Successful,  #{n} new records added to database\n"

    break if n == 41393
  end

  
end
