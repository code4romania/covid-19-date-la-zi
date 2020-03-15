using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace Code4Ro.CoViz19.Api.Tests
{
    public static class Extensions
    {
        /// <summary>
        /// Removes all registered <see cref="ServiceLifetime.Transient"/> registrations of <see cref="TService"/> and adds a new registration which uses the <see cref="Func{IServiceProvider, TService}"/>.
        /// </summary>
        /// <typeparam name="TService">The type of service interface which needs to be placed.</typeparam>
        /// <param name="services"></param>
        /// <param name="implementationFactory">The implementation factory for the specified type.</param>
        public static void SwapTransient<TService>(this IServiceCollection services, Func<IServiceProvider, TService> implementationFactory)
        {
            if (services.Any(x => x.ServiceType == typeof(TService) && x.Lifetime == ServiceLifetime.Transient))
            {
                var serviceDescriptors = services.Where(x => x.ServiceType == typeof(TService) && x.Lifetime == ServiceLifetime.Transient).ToList();
                foreach (var serviceDescriptor in serviceDescriptors)
                {
                    services.Remove(serviceDescriptor);
                }
            }

            services.AddTransient(typeof(TService), (sp) => implementationFactory(sp));
        }

        /// <summary>
        /// Removes all registered <see cref="ServiceLifetime.Transient"/> registrations of <see cref="TService"/> and adds a new registration which uses the <see cref="Func{IServiceProvider, TService}"/>.
        /// </summary>
        /// <typeparam name="TService">The type of service interface which needs to be placed.</typeparam>
        /// <param name="services"></param>
        /// <param name="implementationFactory">The implementation factory for the specified type.</param>
        public static void SwapSingletone<TService>(this IServiceCollection services, Func<IServiceProvider, TService> implementationFactory)
        {
            if (services.Any(x => x.ServiceType == typeof(TService) && x.Lifetime == ServiceLifetime.Singleton))
            {
                var serviceDescriptors = services.Where(x => x.ServiceType == typeof(TService) && x.Lifetime == ServiceLifetime.Singleton).ToList();
                foreach (var serviceDescriptor in serviceDescriptors)
                {
                    services.Remove(serviceDescriptor);
                }
            }

            services.AddTransient(typeof(TService), (sp) => implementationFactory(sp));
        }
    }
}
