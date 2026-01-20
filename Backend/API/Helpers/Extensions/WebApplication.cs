using Core.Extensions;
using Microsoft.Extensions.FileProviders;

namespace API.Helpers.Extensions
{
    public static class WebApplicationExtensions
    {
        public static WebApplication ConfigureApplication(this WebApplication app)
        {
            var config = app.Configuration;

            #region Compression
            app.UseResponseCompression();
            #endregion

            #region CORS
            app.UseCors("AllowAll");
            #endregion

            #region Static files (Images)
            var dir = config["ImagesDir"];
            var path = Path.Combine(Directory.GetCurrentDirectory(), dir!);
            Directory.CreateDirectory(path);

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(path),
                RequestPath = $"/{dir}"
            });
            #endregion

            #region OpenAPI + Swagger
            //app.MapOpenApi();

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/openapi/v1.json", "v1");
                options.OAuthUsePkce();
            });
            #endregion

            #region Middleware
            app.UseRateLimiter();

            app.MapOpenApi().DisableRateLimiting();

            //app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            #endregion

            #region Seed
            //app.SeedDataAsync().GetAwaiter().GetResult();
            #endregion

            return app;
        }
    }
}