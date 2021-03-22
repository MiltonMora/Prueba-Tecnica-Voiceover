<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class CreateUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:create {name} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Crea usuarios pasando usuario y contraseña';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $user = new User();
        $user->name = ucwords($this->argument('name'));
        $user->email = $this->argument('name').'@app.com';
        $user->password = bcrypt($this->argument('password'));
        $user->api_token = bin2hex(openssl_random_pseudo_bytes(15));
        $user->save();
        $user->attachRole('administrator');
    }
}
