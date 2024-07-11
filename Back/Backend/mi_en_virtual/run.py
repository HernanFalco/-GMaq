from flask import Flask #Importacion de modulo
from flask_cors import CORS
from app.database import init_app
from app.views import *

app = Flask(__name__) #Crear una instancia de Flask. Una variable que llama al constructor.
#__name__ le damos una variable

#Decorador que le pasamos la ruta raiz. app es la variable te tipo flask que declaramos arriba.
#Esa variable llama a un metodo llamado route donde registramos algun tipo de URL
#def home():#Funcion que retorna un valor
    #return 'Hola desde flask'

init_app(app)

CORS(app)

app.route('/', methods=['GET'])(index)
app.route('/api/resenas/', methods=['POST'])(create_resena)
app.route('/api/resenas/', methods=['GET'])(get_all_resenas)
app.route('/api/resenas/<int:resena_id>', methods=['GET'])(get_resena)
app.route('/api/resenas/<int:resena_id>', methods=['PUT'])(update_resena)
app.route('/api/resenas/<int:resena_id>', methods=['DELETE'])(delete_resena)

if __name__ == '__main__':
    app.run(debug=True)#El método run lo que hace es levantarme el servicio
    #El debug es para que cada vez que yo haga un cambio me lo levante al seridor solo y no tener que vajarlo y subirlo siempre

#Indicar a que ruta va a estar asociada el metodo

