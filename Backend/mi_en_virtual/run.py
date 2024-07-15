from flask import Flask, jsonify #Importacion de modulo
from flask_cors import CORS
from app.database import init_app
from app.views import *

app = Flask(__name__) 


#CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
cors.init_app(app)   


app.route('/', methods=['GET'])(index)
app.route('/api/resenas/', methods=['POST'])(create_resena)
app.route('/api/resenas/', methods=['GET'])(get_all_resenas)
app.route('/api/resenas/<int:resena_id>', methods=['GET'])(get_resena)
app.route('/api/resenas/<int:resena_id>', methods=['PUT'])(update_resena)
app.route('/api/resenas/<int:resena_id>', methods=['DELETE'])(delete_resena)

if __name__ == '__main__':
    app.run(debug=True)
   

