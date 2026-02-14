from typing import Dict

from fastapi import APIRouter

from .schemas import User, Users


router = APIRouter(prefix='/users')
_users = Users(
    users=[User(name='kencopas')]
)


@router.get('', response_model=Users)
def get_users() -> Users:
    """Return all registered users."""
    return _users


@router.post('')
def add_users(new_users: Users) -> Dict:
    """Register one or more new users."""
    global _users
    _users.users.extend(new_users.users)
    
    return {'message': f'Successfully registered {len(new_users.users)} users.'}
