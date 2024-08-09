from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

DATABASE_URL = "sqlite:///./hospital.db"  # Database URL

Base = declarative_base()

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    specialization = Column(String, index=True)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)  # Create tables

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    session: Session = SessionLocal()
    results = session.query(Doctor).filter(
        (Doctor.name.like(f'%{query}%')) | (Doctor.specialization.like(f'%{query}%'))
    ).all()
    session.close()
    return jsonify([{"id": doctor.id, "name": doctor.name, "specialization": doctor.specialization} for doctor in results])

@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    query = request.args.get('q', '')
    session: Session = SessionLocal()
    results = session.query(Doctor.name).filter(Doctor.name.like(f'%{query}%')).limit(5).all()
    specializations = session.query(Doctor.specialization).filter(Doctor.specialization.like(f'%{query}%')).distinct().limit(5).all()
    session.close()
    suggestions = [result[0] for result in results] + [spec[0] for spec in specializations]
    return jsonify(suggestions)

if __name__ == '__main__':
    app.run(debug=True)
