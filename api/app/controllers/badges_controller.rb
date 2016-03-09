class BadgesController < ApplicationController
  def index
    p params
    @badges = Badge.where(person_id: params[:person_id])
    render json: @badges
  end

  def create
    @badge = Badge.new
  end

  def update
  end
end
