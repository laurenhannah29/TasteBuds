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
    response = requests.get(
        f"https://api.nal.usda.gov/fdc/v1/food/{fdcID}",
        params={
            "api_key": os.getenv("Nutrition_Key"),
        },
    )
    json_response = response.json()
    name = json_response["name"]
    amount = json_response["amount"]
    unitName = json_response["unitName"]
    derivationDescription = json_response["derivationDescription"]

    return flask.render_template(
        "nutrition.html",
        name=name,
        amount=amount,
        unitName=unitName,
        derivationDescription=derivationDescription,
    )
