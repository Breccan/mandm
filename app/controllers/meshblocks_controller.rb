class MeshblocksController < ApplicationController

  def index
    @meshblocks = Meshblock.paginate :page => params[:page] || 1
  end
end
