import logging
import os
from flask import Flask, jsonify
from app.api import TestAPI
from flask_restful import Api, Resource

# from app import config


logging.basicConfig(level=logging.DEBUG,
                    format='[%(asctime)s]: {} %(levelname)s %(message)s'.format(
                        os.getpid()),
                    datefmt='%Y-%m-%d %H:%M:%S',
                    handlers=[logging.StreamHandler()])

logger = logging.getLogger()


def create_app():
    logger.info(f'Starting app in dev environment')
    app = Flask(__name__)
    # app.config.from_object(config)
    return app


app = create_app()
api = Api(app, prefix="/api")


class TestRes(Resource):
    def get(self):
        return jsonify({'task_id': 123, 'status': 'running'})


# data processing endpoint
# api.add_resource(PreProcessingAPI, '/pre-process')

# task status endpoint
api.add_resource(TestRes, '/rest')
api.add_resource(TestAPI, '/tasks')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
