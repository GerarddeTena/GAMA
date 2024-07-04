"""empty message

Revision ID: 3666d2203718
Revises: fa781c7a5b54
Create Date: 2024-06-24 18:33:24.904121

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3666d2203718'
down_revision = 'fa781c7a5b54'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    result = conn.execute("SELECT to_regclass('gama.player')")
    table_exists = result.fetchone()[0]

    if table_exists is None:
        op.create_table('player',
                        sa.Column('player_id', sa.Integer(), primary_key=True),
                        sa.Column('user_id', sa.Integer(), nullable=False),
                        sa.Column('name', sa.String(length=120), nullable=False),
                        sa.Column('type', sa.String(length=120), nullable=False),
                        sa.Column('score', sa.Integer(), nullable=False),
                        sa.Column('level', sa.Integer(), nullable=False),
                        schema='gama'  # Especifica el esquema aquí
                        )
    else:
        with op.batch_alter_table('player', schema='gama') as batch_op:  # Especifica el esquema aquí
            batch_op.add_column(sa.Column('name', sa.String(length=120), nullable=False))
            batch_op.add_column(sa.Column('type', sa.String(length=120), nullable=False))
            batch_op.add_column(sa.Column('score', sa.Integer(), nullable=False))
            batch_op.add_column(sa.Column('level', sa.Integer(), nullable=False))
            # batch_op.drop_constraint('player_ibfk_1', type_='foreignkey')
            batch_op.create_foreign_key(None, 'user', ['user_id'], ['user_id'], referent_schema='gama')

    with op.batch_alter_table('user', schema='gama') as batch_op:  # Especifica el esquema aquí
        batch_op.add_column(sa.Column('email', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('password', sa.String(length=512), nullable=False))
        batch_op.add_column(sa.Column('user_name', sa.String(length=120), nullable=False))
        batch_op.create_unique_constraint(None, ['email'])
        batch_op.create_unique_constraint(None, ['user_name'])
    # ### end Alembic commands ###


def downgrade():
    # Revert changes made to the 'player' table
    with op.batch_alter_table('player', schema=None) as batch_op:
        batch_op.drop_column('level')
        batch_op.drop_column('score')
        batch_op.drop_column('type')
        batch_op.drop_column('name')
        # Assuming 'player_ibfk_1' was the name of the foreign key constraint before it was dropped
        batch_op.create_foreign_key('player_ibfk_1', 'user', ['user_id'], ['user_id'], referent_schema='gama')

    # Revert changes made to the 'user' table
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('user_name')
        batch_op.drop_column('password')
        batch_op.drop_column('email')
        # Assuming there were no unique constraints on 'email' and 'user_name' before they were added