"""empty message

Revision ID: da246cb1afc6
Revises: e86bce04f0a3
Create Date: 2024-06-27 13:12:15.249042

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine.reflection import Inspector

# revision identifiers, used by Alembic.
revision = 'da246cb1afc6'
down_revision = 'e86bce04f0a3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    conn = op.get_bind()
    inspector = Inspector.from_engine(conn)
    if 'player' in inspector.get_table_names():  # Check if 'player' table exists
        with op.batch_alter_table('player', schema=None) as batch_op:
            constraints = inspector.get_foreign_keys('player')
            constraint_names = [constraint['name'] for constraint in constraints]
            if 'player_ibfk_1' in constraint_names:
                batch_op.drop_constraint('player_ibfk_1', type_='foreignkey')
                batch_op.create_foreign_key(None, 'user', ['user_id'], ['user_id'], referent_schema='gama')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    conn = op.get_bind()
    inspector = Inspector.from_engine(conn)
    if 'player' in inspector.get_table_names():  # Check if 'player' table exists
        with op.batch_alter_table('player', schema=None) as batch_op:
            constraints = inspector.get_foreign_keys('player')
            constraint_names = [constraint['name'] for constraint in constraints]
            # Since a new FK is created in upgrade without a specific name, it might not be directly referenced here.
            # Assuming the FK is recreated with the same name or a placeholder is used for demonstration.
            # In practice, ensure to use the correct FK name assigned during the upgrade.
            if any(constraint for constraint in constraints if constraint['referred_table'] == 'user'):
                batch_op.drop_constraint('new_fk_name', type_='foreignkey')  # Placeholder for actual FK name
            batch_op.create_foreign_key('player_ibfk_1', 'user', ['user_id'], ['user_id'], referent_schema='gama')
    # ### end Alembic commands ###
