import flask
from unicodedata import name
from flask import Blueprint, request, redirect, url_for, flash, render_template, jsonify
from flask_login import (
    login_user,
    login_required,
    logout_user,
)
from utils.models import db, Posts
import json
import requests
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())


nutrition = Blueprint("nutrition", __name__)


@nutrition.route("/nutrition", methods=["POST"])
def get_nutrition_facts(fdcID):
    item = request.form["search"]

    response = requests.get(
        f"https://trackapi.nutritionix.com/v2/search/instant?query=${item}",
        params={
            "api_key": os.getenv("Nutrition_Key"),
        },
    )

    json_response = response.json()
    food_name = json_response["food_name"]
    serving_unit = json_response["serving_unit"]
    nf_calories = json_response["nf_calories"]
    image = json_response["image"]

    return flask.render_template(
        "index.html",
        food_name=food_name,
        serving_unit=serving_unit,
        nf_calories=nf_calories,
        image=image,
    )
