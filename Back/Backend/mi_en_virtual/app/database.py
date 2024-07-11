import os #Permite trabajar con elementos del sistema operativo
import mysql.connector #conexion con my sql
from flask import g #conexto global de mi app
from dotenv import load_dotenv #permite cargar al archivo de configuracion para conectar con la db

load_dotenv() #carga variables de entorno desde el archivo .env

#Configuracion de la BBDD usando variables de entorno
DATABASE_CONFIG = {
    'user': os.getenv ('DB_USERNAME'),
    'password': os.getenv ('DB_PASSWORD'),
    'host': os.getenv ('DB_HOST'),
    'database': os.getenv ('DB_NAME'),
    'port': os.getenv ('DB_PORT', 3306)
}

#Funcion para obtener la conexion a la base de datos

def get_db():
    # Si db no esta en el contexto global de flask g
    if 'db' not in g:
        #crear una nueva conexion a la base de datos y guardarla en g
        g.db = mysql.connector.connect(**DATABASE_CONFIG)
    #Retornar la conexion a la bd
    return g.db

#Funcion para cerrar la db
def close_db(e=None):
    #Extrar la conexion a g y eliminarla
    db = g.pop('db',None)
    #Si la conexion existe, cerrarla
    if db is not None:
        db.close()

# Funcion para inicializar la applicacion  con el manejo  de la base de datos
def init_app(app):
    #registrar close_dbpara que se ejecute al final del contexto de la aplicacion
    app.teardown_appcontext(close_db)

    
