from flask_restful import Resource


class PreProcessingAPI(Resource):
    def post(self):
        return {'task_id': 13235}, 200
