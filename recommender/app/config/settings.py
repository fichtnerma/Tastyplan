class BaseConfig():
    API_PREFIX = '/api'
    DEBUG = False


class DevelopmentConfig(BaseConfig):
    FLASK_ENV = 'development'
    DEBUG = True


class ProductionConfig(BaseConfig):
    FLASK_ENV = 'production'
