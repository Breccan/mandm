class DataController < ApplicationController

  def data
    if params[:year] == "2004"
      render :json => {:left => {:male => 10209, :female => 21022}, :totals =>  {:male => 25000, :female => 26000}}
    else
      render :json => {:left => {:male => 10209, :female => 21022}, :totals =>  {:male => 25001, :female => 26001}}
    end
  end
end
