class DataController < ApplicationController
  # data must be valid, totals must be totals, the starting value must be the previous year's ending value.
  ETHNICITY = {:"2004"  => [{:key => :nzeuro, :value => 33+18},       {:key => :maori, :value =>  39+23},     {:key => :pasifika, :value =>  5+1},        {:key => :asian, :value =>    3+1},     {:key => :meela, :value =>    0},    {:key => :other, :value =>   1+1}],
               :"2005"  => [{:key => :nzeuro, :value => 342+203},     {:key => :maori, :value =>  250+172},   {:key => :pasifika, :value =>  48+25},      {:key => :asian, :value =>  100},       {:key => :meela, :value =>    0},    {:key => :other, :value =>   6+8}],
               :"2006"  => [{:key => :nzeuro, :value => 2420+1629},   {:key => :maori, :value =>  1231+1117}, {:key => :pasifika, :value =>  284+210},    {:key => :asian, :value =>  93+56},     {:key => :meela, :value =>    0},    {:key => :other, :value =>  34+32}],
               :"2007"  => [{:key => :nzeuro, :value => 4623+3718},   {:key => :maori, :value =>  1617+1670}, {:key => :pasifika, :value =>  515+449},    {:key => :asian, :value =>  276+205},   {:key => :meela, :value =>    0},    {:key => :other, :value =>  117+76}],
               :"2008"  => [{:key => :nzeuro, :value => 11599+12938}, {:key => :maori, :value =>  2573+2823}, {:key => :pasifika, :value =>  1614 +1841}, {:key => :asian, :value =>  2413+2350}, {:key => :meela, :value => 357+353}, {:key => :other, :value =>  145+136}],
               :initial => [{:key => :nzeuro, :value => 19441+18144}, {:key => :maori, :value => 7211+6851},  {:key => :pasifika, :value => 2752+2524},   {:key => :asian, :value => 2433+2166},  {:key => :meela, :value =>  707},    {:key => :other, :value =>  300+300}]}
  def data
    year = params[:year].to_i
    if (2004..2008).include?(year)
      case params[:category]
      when 'ethnicity'
        render :json => get_data(ETHNICITY, year)
      else
        render :json => {:error => 'Category not found'}
      end
    else
      render :json => {:error => 'Year not found'}
    end
  end
private
  def get_data(constant, year)
    total = []
    constant[:initial].each_with_index do |value, i|
      (year.to_i-2004).times do |j| 
        value[:value] -= ETHNICITY[(2004+j).to_s.to_sym][i][:value]
      end
      total << value
    end
    return {:left => [constant[year.to_s.to_sym]], :total => total}
  end
end
