class DataController < ApplicationController
  # data must be valid, totals must be totals, the starting value must be the previous year's ending value.
  def data
    case params[:category]
    when 'ethnicity'
      case params[:year]
      when '2004'
        render :json => {:left => [[{:key => :nzeuro, :value => 1009}, {:key => :maori, :value =>  500}, {:key => :pasifika, :value =>   50}, {:key => :asian, :value =>    2}, {:key => :meela, :value =>    2}, {:key => :other, :value =>   13}],
                                   [{:key => :nzeuro, :value => 2009}, {:key => :maori, :value =>  500}, {:key => :pasifika, :value =>  100}, {:key => :asian, :value =>  100}, {:key => :meela, :value =>    7}, {:key => :other, :value =>   20}],
                                   [{:key => :nzeuro, :value => 3009}, {:key => :maori, :value =>  500}, {:key => :pasifika, :value =>   40}, {:key => :asian, :value =>  300}, {:key => :meela, :value =>    9}, {:key => :other, :value =>  200}]],
                         :total => [{:key => :nzeuro, :value =>20000}, {:key => :maori, :value => 4000}, {:key => :pasifika, :value => 3000}, {:key => :asian, :value => 1200}, {:key => :meela, :value =>  250}, {:key => :other, :value =>  234}]}
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
