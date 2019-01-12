class CreateRoles < ActiveRecord::Migration[5.1]
  def change
    create_table :roles do |t|

    	t.boolean :is_active, default: true
    	t.string :name
      t.timestamps
    end
    add_index :roles, [:name], unique: true

  end
end
