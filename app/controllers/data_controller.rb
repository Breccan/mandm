class DataController < ApplicationController
  def data
    case params[:category]
    when 'gender'
      case params[:year]
      when '2004'
        render :json => {:left => [[{:key => :male, :value => 2009}, {:key => :female, :value => 2000}],
                                   [{:key => :male, :value => 2009}, {:key => :female, :value => 2000}],
                                   [{:key => :male, :value => 2009}, {:key => :female, :value => 2000}]],
                         :total => [{:key => :male, :value =>12000}, {:key => :female, :value =>12000}]}
      when '2005'
        render :json => {:left => [[{:key => :male, :value => 1000}, {:key => :female, :value => 1000}],
                                   [{:key => :male, :value => 1000}, {:key => :female, :value => 1000}],
                                   [{:key => :male, :value => 1000}, {:key => :female, :value => 1000}]],
                         :total => [{:key => :male, :value => 6000}, {:key => :female, :value => 6000}]}
      else
        render :json => {:error => 'year not found'}
      end
    else
      render :json => {:error => 'Category not found'}
    end
  end
end
