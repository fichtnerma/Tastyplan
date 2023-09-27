from flask import jsonify
from flask_restful import Resource
# from app.main.data_preprossesing import PreProcessingAPI


class TestAPI(Resource):
    def get(self):
        return jsonify({'task_id': 123, 'status': 'running'})


# data processing endpoint
# api.add_resource(PreProcessingAPI, '/pre-process')

# task status endpoint
