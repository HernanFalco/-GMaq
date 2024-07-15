#Intermediario entre lo que ve el usario

from flask import jsonify, request
from app.models import Resena #Dividirlo en capas

#Vamos a generar los metodos para trabajar con nuestra base de datos

def index():
    return jsonify({'message':'Hola, la aplicacion se esta ejecutando correctamente'}) # funciona que tira un mensaje en json

def create_resena():
    data = request.json # conversion de un obj de tipo json a tipi python
    new_resena = Resena(nombre=data['nombre'], texto_resena=data['texto_resena'])
    new_resena.save()
    return jsonify({'message': 'Reseña creada satisfactoriamente'}), 201

def get_all_resenas():
    resenas = Resena.get_all()
    return jsonify([resena.serialize() for resena in resenas])

def get_resena(resena_id):
    resena = Resena.get_by_id(resena_id)
    if not resena:
        return jsonify({'message': 'Reseña no encontrada'}) , 404
    return jsonify(resena.serialize())

def update_resena(resena_id):
    resena = Resena.get_by_id(resena_id)
    if not resena:
        return jsonify ({'message': 'Reseña no encontrada'}), 404
    data = request.json
    resena.nombre = data['nombre']
    resena.texto_resena = data['texto_resena']
    resena.save()
    return jsonify ({'message' : 'Reseña actualizada exitosamente'})

def delete_resena(resena_id):
    resena = Resena.get_by_id(resena_id)
    if not resena:
        return jsonify({'message': 'Reseña no encontrada'}), 404
    resena.delete()
    return jsonify({'message' : 'Reseña eliminada exitosamente'})

