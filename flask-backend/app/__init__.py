from flask import Flask
import json

from config import Config
from app.extensions import db
from app.updateScores import updateScores

def create_app(config_class=Config):
  app = Flask(__name__)

  # Initialize the config file
  app.config.from_object(config_class)

  # Initialize Flask extensions 
  db.init_app(app)
  # CORS(app, resources={r'/*': {"origins": "*"}})

  # Call the script
  updateScores()

  return app