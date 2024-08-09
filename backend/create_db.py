from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./hospital.db"  # Change this to your database URL

Base = declarative_base()

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    specialization = Column(String, index=True)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

# Insert sample data
session = SessionLocal()
doctors = [
    Doctor(id=1, name="Dr. Siddhart Shilpi", specialization="Cardiologist"),
    Doctor(id=2, name="Dr. Arvind Joshi", specialization="Neurologist"),
    Doctor(id=3, name="Dr. Chirag Malik", specialization="Dermatologist"),
    Doctor(id=4, name="Dr. Rahul Kaushik", specialization="Pediatrician"),

]
session.add_all(doctors)
session.commit()
session.close()
