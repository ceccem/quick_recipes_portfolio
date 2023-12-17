require "test_helper"

class SeasoningsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get seasonings_index_url
    assert_response :success
  end

  test "should get new" do
    get seasonings_new_url
    assert_response :success
  end

  test "should get create" do
    get seasonings_create_url
    assert_response :success
  end

  test "should get edit" do
    get seasonings_edit_url
    assert_response :success
  end

  test "should get update" do
    get seasonings_update_url
    assert_response :success
  end

  test "should get destroy" do
    get seasonings_destroy_url
    assert_response :success
  end
end
