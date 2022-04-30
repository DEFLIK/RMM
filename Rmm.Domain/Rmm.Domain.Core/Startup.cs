using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Rmm.Domain.Core.Models;
using Rmm.Domain.Core.Services;
using Rmm.Domain.Core.Services.AuthService;
using Rmm.Domain.Core.Services.DeviceScreenService;
using Rmm.Domain.Core.Services.DeviceStateService;
using Rmm.Domain.Core.Services.DeviceStaticInfoService;
using Rmm.Domain.Core.Services.DeviceSystemLogsService;
using Rmm.Domain.DAL;
using Rmm.Domain.DAL.Entities;
using Rmm.Domain.DAL.Interfaces;
using Rmm.Domain.DAL.Repositories;

namespace Rmm.Domain.Core
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Rmm.Core", Version = "v1" });
            });
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddDbContext<DataContext>(options =>
            {
                options.UseNpgsql(
                    Configuration.GetConnectionString("RmmConnection"),
                    assembly =>
                    {
                        assembly.MigrationsAssembly("Rmm.Domain.DAL");
                    });
            });

            services.AddControllers().AddNewtonsoftJson();

            services.AddScoped<IDbRepository, DbRepository>();
            services.AddScoped<IDataService<DeviceStaticInfo>, DeviceStaticInfoService>();
            services.AddSingleton<IDeviceSystemLogsService, DeviceSystemLogsService>();
            services.AddSingleton<IDeviceStateService, DeviceStateService>();
            services.AddSingleton<IDeviceScreenService, DeviceScreenService>();
            services.AddScoped<IAuthService, AuthService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Rmm.Core v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseStaticFiles();
            if (!env.IsDevelopment())
                app.UseSpaStaticFiles();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "../../Rmm.WebClient";

                if (env.IsDevelopment())
                    spa.UseAngularCliServer("start");
            });
        }
    }
}
