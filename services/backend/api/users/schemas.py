from typing import List
from pydantic import BaseModel


class User(BaseModel):
    name: str


class Users(BaseModel):
    users: List[User]
