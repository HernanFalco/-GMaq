from app.database import get_db

class Resena:
    def __init__(self, id_resena=None, nombre=None, texto_resena=None):
        self.id_resena = id_resena
        self.nombre = nombre
        self.texto_resena = texto_resena

    def save(self):
        db = get_db() #Generar la conexion
        cursor = db.cursor()
        if self.id_resena:
            cursor.execute(""" UPDATE resenas SET nombre = %s, texto_resena = %s
                           WHERE id_resena = %s
                        """, (self.nombre, self.texto_resena, self.id_resena))
        else:
            cursor.execute("""
                INSERT INTO resenas (nombre, texto_resena) VALUES (%s, %s)
            """, (self.nombre, self.texto_resena))
            self.id_resena = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    #Me trae un listado de resenas
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute ("SELECT * FROM resenas")
        rows = cursor.fetchall()
        resenas = [Resena(id_resena=row[0], nombre=row[1], texto_resena=row[2])for row in rows]
        cursor.close()
        return resenas
    
    @staticmethod
    def get_by_id (resena_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM resenas WHERE id_resena = %s", (resena_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Resena(id_resena=row[0], nombre=row[1], texto_resena=row[2])
        return None
    
    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM resenas WHERE id_resena = %s", (self.id_resena,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id_resena': self.id_resena,
            'nombre': self.nombre,
            'texto_resena':self.texto_resena
        }
        
