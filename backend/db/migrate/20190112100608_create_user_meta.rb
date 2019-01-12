class CreateUserMeta < ActiveRecord::Migration[5.1]
  def change
    create_table :user_meta do |t|

    	t.integer :user_id
    	t.string :entity_key
    	t.text :entity_value
      t.timestamps
    end
    add_index :user_meta, [:user_id, :entity_key, :entity_value], unique: true
  end
end
