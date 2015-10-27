"""empty message

Revision ID: 232a843e636b
Revises: 427922082575
Create Date: 2015-10-26 14:35:17.299786

"""

# revision identifiers, used by Alembic.
revision = '232a843e636b'
down_revision = '427922082575'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('patient_referral_comment',
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('last_modified', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_referral_id', sa.Integer(), nullable=True),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.Column('last_modified_by_id', sa.Integer(), nullable=True),
    sa.Column('created_by_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['created_by_id'], ['app_user.id'], name='fk_created_by_id', use_alter=True),
    sa.ForeignKeyConstraint(['last_modified_by_id'], ['app_user.id'], name='fk_last_modified_by_id', use_alter=True),
    sa.ForeignKeyConstraint(['patient_referral_id'], ['patient_referral.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column(u'patient_screening_result', sa.Column('patient_referral_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'patient_screening_result', 'patient_referral', ['patient_referral_id'], ['id'])
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'patient_screening_result', type_='foreignkey')
    op.drop_column(u'patient_screening_result', 'patient_referral_id')
    op.drop_table('patient_referral_comment')
    ### end Alembic commands ###
