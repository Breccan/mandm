class DataController < ApplicationController
  # data must be valid, totals must be totals, the starting value must be the previous year's ending value.
  def data
    case params[:category]
    when 'ethnicity'
      case params[:year]
      when '2004'
        render :json => {:left => [[{:key => :nzeuro, :value => 33+18}, {:key => :maori, :value =>  39+23}, {:key => :pasifika, :value =>   5+1}, {:key => :asian, :value =>    3+1}, {:key => :meela, :value =>    0}, {:key => :other, :value =>   1+1}],
                                   [{:key => :nzeuro, :value => 342+203}, {:key => :maori, :value =>  250+172}, {:key => :pasifika, :value =>  48+25}, {:key => :asian, :value =>  100}, {:key => :meela, :value =>    0}, {:key => :other, :value =>   6+8}],
                                   [{:key => :nzeuro, :value => 2420+1629}, {:key => :maori, :value =>  1231+1117}, {:key => :pasifika, :value =>   284+210}, {:key => :asian, :value =>  93+56}, {:key => :meela, :value =>    0}, {:key => :other, :value =>  34+32}],
                                   [{:key => :nzeuro, :value => 4623+3718}, {:key => :maori, :value =>  1617+1670}, {:key => :pasifika, :value =>  515+449}, {:key => :asian, :value =>  276+205}, {:key => :meela, :value =>    0}, {:key => :other, :value =>  117+76}],
                                   [{:key => :nzeuro, :value => 11599+12938}, {:key => :maori, :value =>  2573+2823}, {:key => :pasifika, :value =>  1614 +1841}, {:key => :asian, :value =>  2413+2350}, {:key => :meela, :value =>   357+353}, {:key => :other, :value =>  145+136}]],
                         :total => [{:key => :nzeuro, :value => 19441+18144}, {:key => :maori, :value => 7211+6851}, {:key => :pasifika, :value => 2752+2524}, {:key => :asian, :value => 2433+2166}, {:key => :meela, :value =>  707}, {:key => :other, :value =>  300+300}]}

      when '2005'
        render :json => {:left => [[{:key => :nzeuro, :value => 1009}, {:key => :maori, :value =>  500}, {:key => :pasifika, :value =>   50}, {:key => :asian, :value =>    2}, {:key => :meela, :value =>    2}, {:key => :other, :value =>    0}],
                                   [{:key => :nzeuro, :value => 2009}, {:key => :maori, :value =>  500}, {:key => :pasifika, :value =>  100}, {:key => :asian, :value =>  100}, {:key => :meela, :value =>    7}, {:key => :other, :value =>    0}],
                                   [{:key => :nzeuro, :value => 3009}, {:key => :maori, :value =>  500}, {:key => :pasifika, :value =>   40}, {:key => :asian, :value =>  300}, {:key => :meela, :value =>    9}, {:key => :other, :value =>    0}]],
                         :total => [{:key => :nzeuro, :value =>13973}, {:key => :maori, :value => 2500}, {:key => :pasifika, :value => 2810}, {:key => :asian, :value =>  798}, {:key => :meela, :value =>  232}, {:key => :other, :value =>    1}]}
      else
        render :json => {:error => 'year not found'}
      end
    else
      render :json => {:error => 'Category not found'}
    end
  end
end
