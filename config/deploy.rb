set :application, "atn"
set :repository,  "git@github.com:Breccan/mandm.git"
set :deploy_to, "/apps/mandm"

set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, "173.255.209.118"
role :app, "173.255.209.118"
role :db,  "173.255.209.118", :primary => true # This is where Rails migrations will run
set :user, "root"

set :use_sudo, true
default_run_options[:pty] = true

after "deploy", "setup:permissions"
after 'deploy:update_code', 'bundler:bundle_new_release'
namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end

end

namespace :setup do
  task :permissions do
    run "#{try_sudo} chown -R www-data:www-data #{latest_release}"
  end
end

namespace :bundler do
  task :create_symlink, :roles => :app do
    shared_dir = File.join(shared_path, 'bundle')
    release_dir = File.join(current_release, '.bundle')
    run("mkdir -p #{shared_dir} && ln -s #{shared_dir} #{release_dir}")
  end

  task :bundle_new_release, :roles => :app do
    bundler.create_symlink
    run "RAILS_ENV=production cd #{release_path} && bundle install  --without test"
  end
end
